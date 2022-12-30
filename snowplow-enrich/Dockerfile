FROM --platform=linux/amd64 snowplow/snowplow-enrich-pubsub:3.2.3
USER root

COPY config/ ./snowplow/config/

EXPOSE 80 443 8080

ENTRYPOINT ["/home/snowplow/bin/snowplow-enrich-pubsub", \
    "--config", \
    "./snowplow/config/config.hocon", \
    "--enrichments", \
    "./snowplow/config/enrichments", \
    "--iglu-config", \
    "./snowplow/config/iglu_resolver.json"]