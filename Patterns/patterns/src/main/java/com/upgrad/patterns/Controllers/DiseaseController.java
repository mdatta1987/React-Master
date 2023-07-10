package com.upgrad.patterns.Controllers;

import com.upgrad.patterns.Service.DiseaseCountFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/v1/disease")
public class DiseaseController {
	private DiseaseCountFacade diseaseCountFacade;
	@Autowired
	public DiseaseController(DiseaseCountFacade diseaseCountFacade) {
		this.diseaseCountFacade = diseaseCountFacade;
	}

	@RequestMapping(method = RequestMethod.GET, path = "/disease-sh-io/count")
	public ResponseEntity<Object> GetDiseaseShCount() {
		Object result = diseaseCountFacade.getDiseaseShCount();

		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET, path = "/john-hopkins/count")
	public ResponseEntity<Object> GetJohnHopkinsCount() {
		Object result = diseaseCountFacade.getJohnHopkinCount();

		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET, path = "/infected-ratio")
	public ResponseEntity<Object> GetInfectedRatio(@RequestParam String sourceType) {
		try {
			Object result = diseaseCountFacade.getInfectedRatio(sourceType);

			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (IllegalArgumentException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_GATEWAY);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
