package com.unibus;
import org.springframework.web.bind.annotation.*; import org.springframework.data.domain.*;
@RestController @RequestMapping("/estudantes")
public class EstudanteController{
private final EstudanteRepository repo; public EstudanteController(EstudanteRepository r){repo=r;}
@GetMapping public Page<Estudante> all(Pageable p){return repo.findAll(p);}
@PostMapping public Estudante post(@RequestBody Estudante e){return repo.save(e);}
@PutMapping("/{id}") public Estudante put(@PathVariable Integer id,@RequestBody Estudante e){e.setId(id);return repo.save(e);}
@DeleteMapping("/{id}") public void del(@PathVariable Integer id){repo.deleteById(id);}
}