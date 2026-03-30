package com.emr.controller;

import com.emr.model.Prescription;
import com.emr.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class PrescriptionController {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @GetMapping("/prescriptions/user/{userId}")
    public List<Prescription> getByUser(@PathVariable Long userId) {
        return prescriptionRepository.findByUserId(userId);
    }

    @PostMapping("/prescriptions")
    public Prescription create(@RequestBody Prescription prescription) {
        return prescriptionRepository.save(prescription);
    }

    @PutMapping("/prescriptions/{id}")
    public ResponseEntity<Prescription> update(@PathVariable Long id, @RequestBody Prescription updated) {
        return prescriptionRepository.findById(id).map(p -> {
            p.setMedication(updated.getMedication());
            p.setDosage(updated.getDosage());
            p.setQuantity(updated.getQuantity());
            p.setRefillOn(updated.getRefillOn());
            p.setRefillSchedule(updated.getRefillSchedule());
            return ResponseEntity.ok(prescriptionRepository.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/prescriptions/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        prescriptionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
