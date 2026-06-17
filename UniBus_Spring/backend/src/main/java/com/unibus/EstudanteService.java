package com.unibus;
import org.springframework.stereotype.Service; import org.springframework.transaction.annotation.Transactional;
@Service public class EstudanteService{
private final EstudanteRepository repo; public EstudanteService(EstudanteRepository r){repo=r;}
@Transactional public Estudante save(Estudante e){return repo.save(e);}
}