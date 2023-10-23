# README

## Requirements

* Ruby 3.0.0

* Rails 7.0.0

* Database Adapter

* Node


## Technologies/tools used

* graphql

* Apollo Client

* React


## Project Setup

## Using Docker

1. Build Project

   ```bash
   docker-compose build
   ```

2. Precompile assets

    ```bash
    docker-compose run web bundle exec rails assets:precompile
    ```

3. Run server

   ```bash
   docker-compose up
   ```

1.  Get the code. Clone this git repository and check out the latest release:

    ```bash
    git clone https://github.com/
    cd productvity-hub
    ```

2.  Install the required gems by running the following command in the project root directory:

    ```bash
    bundle install
    ```

3.  Precompile assets by running:
    ```bash
    bundle exec rails assets:precompile
    ```

5.  Create and populate database with seeds using:
    ```
    rails db:create db:migrate db:seed
    ```

6.  Install dependencies:
    ```
    yarn install
    ```

7.  Run server:
    ```
    bin/dev
    ```
    your application is ready to serve `http://0.0.0.0:3000/`
