# Require any additional compass plugins here.
#require 'animation'
# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "css"
sass_dir = "sass"
images_dir = "img"
javascripts_dir = "js"


# With the sourcemap = true setting in config.rb the compass watch command will generate *.css.map files and *.css files that have comments at the bottom pointing to the location of the *.css.map files.
#sourcemap = true
sourcemap = (environment == :production) ? false : true

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
#output_style = :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false

# set environment of your code  environment to :development or :production
environment = :development


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
