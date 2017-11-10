module Typewriter::Editable
  extend ActiveSupport::Concern

  class Block
    include ActionView::Helpers::TagHelper
    include ActionView::Helpers::TextHelper
    include ActionView::Context

    def self.parser_for(block)
      block_type_class = BLOCK_TYPES[block['type']]
      throw "Unknown Block Type `#{block['type']}`" unless block_type_class
      block_type_class.new(block)
    end

    def initialize(block)
      @block = block
    end

    def text
      children(parsed_as: :text)
    end

    def html
      throw :unknow_block_type
    end

    private

    def children(parsed_as: :html)
      child_nodes.map(&parsed_as).join
    end

    def child_nodes
      if @block['isVoid']
        []
      else
        @child_nodes ||= @block['nodes'].map do |node|
          if node['kind'] == 'block'
            Block.parser_for(node)
          elsif node['kind'] == 'inline'
            Inline.parser_for(node)
          else
            TextNode.new(node)
          end
        end
      end
    end
  end

  class Inline < Block
    def self.parser_for(inline)
      inline_type_class = INLINE_TYPES[inline['type']]
      throw "Unknown Inline Type `#{inline['type']}`" unless inline_type_class
      inline_type_class.new(inline)
    end
  end

  class Link < Inline
    def html
      tag.a href: @block['data']['href'], target: '_blank' do
        raw(children)
      end
    end
  end

  INLINE_TYPES = {
    'link' => Link
  }

  class BlockQuote < Block
    def html
      tag.blockquote(raw(children))
    end
  end

  class BulletedList < Block
    def html
      tag.ul(raw(children))
    end
  end

  class NumberedList < Block
    def html
      tag.ol(raw(children))
    end
  end

  class ListItem < Block
    def html
      tag.li(raw(children))
    end
  end

  class HeadingOne < Block
    def html
      tag.h1(raw(children))
    end
  end

  class HeadingTwo < Block
    def html
      tag.h2(raw(children))
    end
  end

  class HeadingThree < Block
    def html
      tag.h3(raw(children))
    end
  end

  class HeadingFour < Block
    def html
      tag.h4(raw(children))
    end
  end

  class HeadingFive < Block
    def html
      tag.h5(raw(children))
    end
  end

  class HeadingSix < Block
    def html
      tag.h6(raw(children))
    end
  end

  class Paragraph < Block
    def html
      tag.p(raw(children))
    end
  end

  class Phrase < Block
    def html
      raw(children)
    end
  end

  class Video < Block
    def html
      return '' unless @block['data']['video'].present?

      # remove related videos at the end
      video_url = @block['data']['video'] + '?rel=0&amp;showinfo=0'


      tag.div class: 'video' do
        tag.iframe src: video_url, frameborder: '0', webkitallowfullscreen: true, mozallowfullscreen: true, allowfullscreen: true
      end
    end
  end

  class Embed < Block
    def html
      return '' unless @block['data']['content'].present?

      tag.div class: 'embed' do
        raw(@block['data']['content'])
      end
    end
  end

  class Image < Block
    def html
      return '' unless @block['data']['id'].present?

      id = @block['data']['id']
      upload = Typewriter::ImageUpload.find(id)
      src = upload.image_src
      srcset = upload.image_srcset

      caption_list = @block['data'].select do |key, value|
        ['id', 'file'].exclude?(key)
      end.to_h

      tag.figure class: 'article-image' do
        tag.div class: 'container' do
          concat image(src, srcset)
          concat captions(caption_list)
        end
      end
    end

    private

    def image(src, srcset)
      tag.div class: 'image' do
        tag.img src: src, srcset: srcset
      end
    end

    def captions(list)
      tag.figcaption class: 'info' do
        raw(list.map do |label, caption|
          raw tag.div(caption, class: label)
        end.join)
      end
    end
  end

  BLOCK_TYPES = {
    'block-quote'   => BlockQuote,
    'bulleted-list' => BulletedList,
    'numbered-list' => NumberedList,
    'list-item'     => ListItem,
    'heading-one'   => HeadingOne,
    'heading-two'   => HeadingTwo,
    'heading-three' => HeadingThree,
    'heading-four'  => HeadingFour,
    'heading-five'  => HeadingFive,
    'heading-six'   => HeadingSix,
    'paragraph'     => Paragraph,
    'video'         => Video,
    'embed'         => Embed,
    'image'         => Image,
    'phrase'        => Phrase,
  }

  class TextNode
    def initialize(node)
      @node = node
    end

    def text
      return @node['text'] if flat?

      leaves.map(&:text).join
    end

    def html
      return @node['text'] if flat?

      leaves.map(&:html).join
    end

    private

    def flat?
      !@node.key?('leaves')
    end

    def leaves
      return [] if flat?
      @leaves ||= @node['leaves'].map{ |leaf| Leaf.new(leaf) }
    end
  end

  class Leaf
    include ActionView::Helpers::TagHelper

    MARKS = {
      'bold' => 'strong',
      'italic' => 'i',
      'strikethrough' => 'del',
      'highlight' => 'em',
      'code' => 'code',
    }

    def initialize(leaf)
      @leaf = leaf
    end

    def text
      @leaf['text']
    end

    def html
      return text unless marks.any?

      add_marks(text, marks)
    end

    private

    def marks
      return [] if flat?
      @leaf['marks']
    end

    def flat?
      !@leaf.key?('marks')
    end

    def add_marks(text, marks)
      a_mark, *remaining_marks = marks
      tag_name = MARKS[a_mark['type']]

      if remaining_marks.empty?
        content_tag(tag_name, text)
      else
        content_tag(tag_name, raw(add_marks(text, remaining_marks)))
      end
    end
  end

  class Blocks
    def initialize(content)
      @content = content
    end

    def as_html
      blocks
        .map(&:html)
        .join("\n")
        .html_safe
    end

    def as_words
      blocks
        .map(&:text)
        .join
        .split(' ')
    end

    def blocks
      nodes.map do |block|
        Block.parser_for(block)
      end
    end

    def nodes
      return [] unless @content.present?
      JSON.parse(@content)['document']['nodes']
    end
  end

  class EditableAttribute
    delegate :empty?, :present?, :blank?, to: :to_s

    def initialize(attr_name, raw_value)
      @attr_name, @raw_value = attr_name, raw_value
    end

    def as_json(options = {})
      @raw_value
    end

    def to_s
      to_html
    end

    def to_html
      Blocks.new(@raw_value).as_html
    end

    def to_words
      Blocks.new(@raw_value).as_words
    end

    def raw
      @raw_value
    end
  end

  class_methods do
    def has_editable(*attributes)
      attributes.each do |attribute|
        # @article.body # => <html>
        # @article.body.raw # {json}
        define_method(attribute) do
          EditableAttribute.new(attribute, read_attribute(attribute))
        end
      end
    end
  end
end
