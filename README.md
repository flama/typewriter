# Typewriter
Adaptable content editor for CMS creators.

## Usage
How to use my plugin.

## Installation
Add this lines to your application's Gemfile:

```ruby
gem 'typewriter', github: 'flama/typewriter'
gem 'nanofile', github: 'flama/nanofile'
```

And then execute:
```bash
$ bundle
```

Add an initializer with image upload configurations:
`config/initializers/typewriter.rb`

```ruby
Typewriter.config_images(
  access_key_id: ENV['AWS_KEY_ID'],
  secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
  region: ENV['S3_REGION'],
  bucket: ENV['S3_BUCKET'],
  breakpoints: {
    small: 640,
    medium: 1024,
    large: 1440,
    huge: 1920
  },
  sizes: {
    small: 512 * 2,
    medium: 730 * 2,
    large: 780 * 2,
    huge: 1040 * 2,
  }
)
```

And install the migrations:
```bash
$ rails typewriter:install:migrations db:migrate
```

## License
The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
