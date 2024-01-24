$:.push File.expand_path('../lib', __FILE__)

# Maintain your gem's version:
require 'typewriter/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = 'typewriter'
  s.version     = Typewriter::VERSION
  s.authors     = ['Flama Team']
  s.email       = ['hello@flama.is']
  s.homepage    = 'https://flama.is'
  s.summary     = 'Adaptable content editor for CMS creators.'
  s.description = 'Simple yet powerful content editor for people who build their own CMS.'
  s.license     = 'MIT'

  s.files = Dir['{app,config,db,lib}/**/*', 'MIT-LICENSE', 'Rakefile', 'README.md']

  s.add_dependency 'rails', '>= 5.2.0'

  s.add_development_dependency 'sqlite3'
  s.add_development_dependency 'byebug', '~> 9.1'
  s.add_development_dependency 'webpacker', '3.0.1'
  s.add_development_dependency 'sass-rails', '~> 5.0', '>= 5.0.6'
end
