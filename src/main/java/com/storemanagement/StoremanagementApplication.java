package com.storemanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.storemanagement.furnishingstore.repository")
public class StoremanagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(StoremanagementApplication.class, args);
	}

}
