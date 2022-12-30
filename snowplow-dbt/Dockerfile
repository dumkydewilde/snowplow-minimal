
FROM ghcr.io/dbt-labs/dbt-bigquery:1.3.latest

ARG BQ_PROJECT_ID
ARG BQ_DATASET
ARG DBT_PROJECT_DIR
ARG WEB_EVENTS_START_DATE

# define in docker build
ENV DBT_PROJECT_DIR=$DBT_PROJECT_DIR
ENV BQ_PROJECT_ID=$BQ_PROJECT_ID
ENV BQ_DATASET=$BQ_DATASET
ENV WEB_EVENTS_START_DATE=$WEB_EVENTS_START_DATE

# default env values, can be overridden
ENV BQ_LOCATION="europe-west1"
ENV DBT_PROFILES_DIR=/usr/app/
ENV GOOGLE_APPLICATION_CREDENTIALS=/usr/app/auth/gcp-service-account.json
ENV TARGET=prod

USER root

# Copy dbt project in the docker image to build
COPY $DBT_PROJECT_DIR /usr/app/
COPY auth /usr/app/auth/

# Use root user to avoid to avoid issues with permissions
USER root

RUN dbt debug --target=$TARGET

ENTRYPOINT dbt deps && dbt run --selector snowplow_web --target=$TARGET
