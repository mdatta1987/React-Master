package com.upgrad.patterns.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class DiseaseShResponse {
    @JsonProperty("country")
    private String country;
    @JsonProperty("cases")
    private Float cases;
    @JsonProperty("todayCases")
    private Integer todayCases;
}
