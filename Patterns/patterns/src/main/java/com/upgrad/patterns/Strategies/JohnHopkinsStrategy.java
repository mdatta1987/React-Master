package com.upgrad.patterns.Strategies;

import com.upgrad.patterns.Config.RestServiceGenerator;
import com.upgrad.patterns.Entity.JohnHopkinResponse;
import com.upgrad.patterns.Interfaces.IndianDiseaseStat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Arrays;

@Service
public class JohnHopkinsStrategy implements IndianDiseaseStat {
	private Logger logger = LoggerFactory.getLogger(JohnHopkinsStrategy.class);
	private RestTemplate restTemplate;
	@Value("${config.john-hopkins-url}")
	private String baseUrl;

	public JohnHopkinsStrategy() {
		restTemplate = RestServiceGenerator.GetInstance();
	}

	@Override
	public String GetActiveCount() {
		//try block
			//get response from the getJohnHopkinResponses method
			//filter the data based such that country equals India (use getCountry() to get the country value)
			//Map the data to "confirmed" value (use getStats() and getConfirmed() to get stats value and confirmed value)
			//Reduce the data to get a sum of all the "confirmed" values
			//return the response after rounding it up to 0 decimal places
		//catch block
			//log the error
		try {
			JohnHopkinResponse[] johnHopkinResponses = getJohnHopkinResponses();
			int totalConfirmedCases = 0;

			for (int i = 0; i < johnHopkinResponses.length; i++) {
				String country = johnHopkinResponses[i].getCountry();

				if (country.equals("India")) {
					int confirmed = (int) Math.round(johnHopkinResponses[i].getStats().getConfirmed());
					totalConfirmedCases = totalConfirmedCases + confirmed;
				}
			}

			return String.valueOf(totalConfirmedCases);
		} catch (Exception e) {
			logger.error("Exception occured in John Hopkins API call : " + e);
		}

		return null;
	}

	private JohnHopkinResponse[] getJohnHopkinResponses() {
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
		headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
		HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

		return restTemplate.exchange(
				baseUrl, HttpMethod.GET, new HttpEntity<Object>(headers),
				JohnHopkinResponse[].class).getBody();
	}
}
