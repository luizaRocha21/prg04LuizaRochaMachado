package com.unibus;
import jakarta.persistence.*; import jakarta.validation.constraints.*;
@Entity public class Embarque {
@Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer id;
@NotNull private String nome;
public Integer getId(){return id;} public void setId(Integer id){this.id=id;}
}