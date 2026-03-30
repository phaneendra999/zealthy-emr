package com.emr.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "medications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Medication {
    @Id
    private String name;
}
