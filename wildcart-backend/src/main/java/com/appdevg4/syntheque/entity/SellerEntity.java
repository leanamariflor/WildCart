package com.appdevg4.syntheque.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.appdevg4.syntheque.util.NoXss;
import com.appdevg4.syntheque.util.NoSqlInjection;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "sellers")
public class SellerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NoXss
    @NoSqlInjection
    @Size(max = 50)
    private String sellerId;
    
    @NotBlank(message = "First name is required")
    @NoXss
    @NoSqlInjection
    @Size(min = 2, max = 50)
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    @NoXss
    @NoSqlInjection
    @Size(min = 2, max = 50)
    private String lastName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 100)
    private String email;
    
    @NoXss
    @NoSqlInjection
    @Pattern(regexp = "^[0-9+\\-\\s()]*$", message = "Invalid phone number format")
    @Size(max = 20)
    private String number;
    
    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 255)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    public SellerEntity() {}

    public SellerEntity(String sellerId, String firstName, String lastName, String email, String number, String password) {
        this.sellerId = sellerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.number = number;
        this.password = password;
    }

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSellerId() { return sellerId; }
    public void setSellerId(String sellerId) { this.sellerId = sellerId; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
