FROM mariadb:10.9.3
ADD db/schema.sql /docker-entrypoint-initdb.d/
EXPOSE 3306
CMD ["mysqld"]