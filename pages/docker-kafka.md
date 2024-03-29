# Docker Kafka

```
  # https://hub.docker.com/r/confluentinc/cp-kafka/
  kafka:
    container_name: kafka
    image: confluentinc/cp-kafka:5.1.0
    hostname: kafka
    ports:
      - 9092:9092
    environment:
      TZ: ${TZ}
      KAFKA_LISTENERS: PLAINTEXT://kafka:19092,LISTENER_DOCKER_EXTERNAL://kafka:9092
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:19092,LISTENER_DOCKER_EXTERNAL://kafka:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,LISTENER_DOCKER_EXTERNAL:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_ZOOKEEPER_CONNECT: "zookeeper:2181"
      KAFKA_BROKER_ID: 1
      KAFKA_NUM_PARTITIONS: 3
      KAFKA_DEFAULT_REPLICATION_FACTOR: 1
      KAFKA_LOG4J_LOGGERS: "kafka.controller=INFO,kafka.producer.async.DefaultEventHandler=INFO,state.change.logger=INFO"
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      CONFLUENT_SUPPORT_CUSTOMER_ID: 'anonymous'
      KAFKA_AUTO_CREATE_TOPICS_ENABLE: "true"
      JMX_PORT: 9999
      KAFKA_JMX_OPTS: -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -Djava.rmi.server.hostname=kafka -Dcom.sun.management.jmxremote.rmi.port=9999
    restart: on-failure
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    depends_on:
      - zookeeper

  # https://hub.docker.com/r/hlebalbau/kafka-manager/
  kafka-manager:
    image: hlebalbau/kafka-manager
    container_name: kafka-manager
    ports:
      - 9000:9000
    environment:
      TZ: ${TZ}
      ZK_HOSTS: "zookeeper:2181"
      APPLICATION_SECRET: "random-secret"
    command: -Dpidfile.path=/dev/null
    depends_on:
      - kafka

  # https://hub.docker.com/r/confluentinc/cp-zookeeper/
  zookeeper:
    image: confluentinc/cp-zookeeper:5.1.0
    container_name: zookeeper
    hostname: zookeeper
    ports:
      - 2181:2181
    environment:
      - ZOOKEEPER_CLIENT_PORT=2181
      - TZ=${TZ}

  schema-registry:
    image: confluentinc/cp-schema-registry:5.1.0
    hostname: schema-registry
    container_name: schema-registry
    depends_on:
      - zookeeper
      - kafka
    ports:
      - 8081:8081
    environment:
      SCHEMA_REGISTRY_HOST_NAME: schema-registry
      SCHEMA_REGISTRY_KAFKASTORE_CONNECTION_URL: 'zookeeper:2181'
      TZ: ${TZ}
```