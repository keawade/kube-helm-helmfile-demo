# ./8-values/templates/templates.tpl
# Name spacing templates is important because templates are _global_ and you can
# have collisions with other templates. This is particularly relevant if you
# pull in child charts with their own templates.
{{- define "demoExpressApp.databaseConnectionString" }}
{{- with .Values.demoExpressApp.database }}
{{- print "postgres://" .username ":" .password "@" .address ":" .port "/" .name }}
{{- end }}
{{- end -}}
