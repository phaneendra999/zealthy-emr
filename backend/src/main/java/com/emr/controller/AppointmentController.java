package com.emr.controller;

import com.emr.model.Appointment;
import com.emr.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping("/appointments/user/{userId}")
    public List<Appointment> getByUser(@PathVariable Long userId) {
        return appointmentRepository.findByUserId(userId);
    }

    @PostMapping("/appointments")
    public Appointment create(@RequestBody Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @PutMapping("/appointments/{id}")
    public ResponseEntity<Appointment> update(@PathVariable Long id, @RequestBody Appointment updated) {
        return appointmentRepository.findById(id).map(a -> {
            a.setProvider(updated.getProvider());
            a.setDatetime(updated.getDatetime());
            a.setRepeatSchedule(updated.getRepeatSchedule());
            a.setRepeatEnd(updated.getRepeatEnd());
            return ResponseEntity.ok(appointmentRepository.save(a));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/appointments/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        appointmentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
