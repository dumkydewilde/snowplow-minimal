# snowplow-minimal
A minimal (GCP) pipeline for Snowplow web analytics used on dumky.net. Contains the following parts of the pipeline.
- A collector based on Google Cloud Run to collect data from a Snowplow tracker.
- An enricher to read from a PubSub topic and add and validate data from the collector. This currently runs on GCP compute engine but will be transitioned to Cloud Run Jobs in the future.
- A loader that collects PubSub messages from the enricher and loads them into BigQuery. This currently runs on GCP compute engine but will be transitioned to Cloud Run Jobs in the future.
- A Snowplow dbt model that creates tested aggregates from the raw data based on the Snowplow dbt package. This runs on Cloud Run Jobs.
- A Cloudflare Worker that exposes JSON exports from BigQuery as an API so pageviews, referrers, etc. can be made publicly available on [dumky.net](https://www.dumky.net/analytics/)
