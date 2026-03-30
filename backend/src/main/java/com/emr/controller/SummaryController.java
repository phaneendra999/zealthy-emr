package com.emr.controller;

import com.emr.repository.AppointmentRepository;
import com.emr.repository.PrescriptionRepository;
import com.emr.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
public class SummaryController {

    @Autowired private UserRepository userRepository;
    @Autowired private AppointmentRepository appointmentRepository;
    @Autowired private PrescriptionRepository prescriptionRepository;

    @GetMapping("/users/summary")
    public List<Map<String, Object>> getUsersSummary() {
        return userRepository.findAll().stream().map(u -> {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", u.getId());
            m.put("name", u.getName());
            m.put("email", u.getEmail());
            m.put("appointmentCount", appointmentRepository.findByUserId(u.getId()).size());
            m.put("prescriptionCount", prescriptionRepository.findByUserId(u.getId()).size());
            return m;
        }).toList();
    }
}
