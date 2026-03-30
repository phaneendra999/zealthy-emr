package com.emr.repository;

import com.emr.model.Dosage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DosageRepository extends JpaRepository<Dosage, String> {}
