module RedmineQuadrupleclickCodeblock
  class StylesheetHook < Redmine::Hook::ViewListener
    def view_layouts_base_html_head(context)
      javascript_include_tag "quadrupleclick-codeblock", :plugin => :redmine_quadrupleclick_codeblock
    end
  end
end
