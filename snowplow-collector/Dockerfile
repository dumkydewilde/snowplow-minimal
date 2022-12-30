FROM --platform=linux/amd64 snowplow/scala-stream-collector-pubsub:2.7.1
USER root

COPY config/ ./snowplow/config/

EXPOSE 80 443 8080

ENTRYPOINT ["/opt/snowplow/bin/snowplow-stream-collector", "--config", "./snowplow/config/config.hocon"]