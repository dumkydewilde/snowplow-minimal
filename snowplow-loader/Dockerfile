FROM --platform=linux/amd64 snowplow/snowplow-bigquery-streamloader:1.4.2
USER root

COPY config/ ./snowplow/config/

EXPOSE 80 443 8080

ENTRYPOINT ["/opt/snowplow/bin/snowplow-bigquery-streamloader", \
    "--config", "./snowplow/config/config.hocon", \
    "--resolver", "./snowplow/config/iglu_resolver.json"]