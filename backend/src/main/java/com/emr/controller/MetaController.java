package com.emr.controller;

import com.emr.model.Dosage;
import com.emr.model.Medication;
import com.emr.repository.DosageRepository;
import com.emr.repository.MedicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class MetaController {

    @Autowired
    private MedicationRepository medicationRepository;

    @Autowired
    private DosageRepository dosageRepository;

    @GetMapping("/medications")
    public List<Medication> getMedications() {
        return medicationRepository.findAll();
    }

    @GetMapping("/dosages")
    public List<Dosage> getDosages() {
        return dosageRepository.findAll();
    }
}
