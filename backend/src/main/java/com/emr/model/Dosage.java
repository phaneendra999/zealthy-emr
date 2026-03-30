package com.emr.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "dosages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dosage {
    @Id
    private String value;
}
