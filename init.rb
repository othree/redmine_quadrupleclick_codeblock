# Redmine pandoc formatter
require 'redmine'
require 'redmine_quadrupleclick_codeblock'
require 'redmine_quadrupleclick_codeblock/hooks/view_layouts_base_html_head'

Redmine::Plugin.register :redmine_quadrupleclick_codeblock do
  name 'readmine quadrupleclick codeblock'
  author 'othree'
  description 'Quadrupleclick code block to select all code'
  version '1.0'
end
