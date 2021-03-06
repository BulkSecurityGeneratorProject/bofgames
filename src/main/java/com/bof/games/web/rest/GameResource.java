package com.bof.games.web.rest;

import com.bof.games.domain.Game;
import com.bof.games.repository.GameRepository;
import com.bof.games.repository.search.GameSearchRepository;
import com.bof.games.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.bof.games.domain.Game}.
 */
@RestController
@RequestMapping("/api")
public class GameResource {

    private final Logger log = LoggerFactory.getLogger(GameResource.class);

    private static final String ENTITY_NAME = "game";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GameRepository gameRepository;

    private final GameSearchRepository gameSearchRepository;

    public GameResource(GameRepository gameRepository, GameSearchRepository gameSearchRepository) {
        this.gameRepository = gameRepository;
        this.gameSearchRepository = gameSearchRepository;
    }

    /**
     * {@code POST  /games} : Create a new game.
     *
     * @param game the game to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new game, or with status {@code 400 (Bad Request)} if the game has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/games")
    public ResponseEntity<Game> createGame(@RequestBody Game game) throws URISyntaxException {
        log.debug("REST request to save Game : {}", game);
        if (game.getId() != null) {
            throw new BadRequestAlertException("A new game cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Game result = gameRepository.save(game);
        gameSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/games/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /games} : Updates an existing game.
     *
     * @param game the game to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated game,
     * or with status {@code 400 (Bad Request)} if the game is not valid,
     * or with status {@code 500 (Internal Server Error)} if the game couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/games")
    public ResponseEntity<Game> updateGame(@RequestBody Game game) throws URISyntaxException {
        log.debug("REST request to update Game : {}", game);
        if (game.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Game result = gameRepository.save(game);
        gameSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, game.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /games} : get all the games.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of games in body.
     */
    @GetMapping("/games")
    public List<Game> getAllGames() {
        log.debug("REST request to get all Games");
        return gameRepository.findAll();
    }

    /**
     * {@code GET  /games/:id} : get the "id" game.
     *
     * @param id the id of the game to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the game, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/games/{id}")
    public ResponseEntity<Game> getGame(@PathVariable Long id) {
        log.debug("REST request to get Game : {}", id);
        Optional<Game> game = gameRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(game);
    }

    /**
     * {@code DELETE  /games/:id} : delete the "id" game.
     *
     * @param id the id of the game to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/games/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        log.debug("REST request to delete Game : {}", id);
        gameRepository.deleteById(id);
        gameSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/games?query=:query} : search for the game corresponding
     * to the query.
     *
     * @param query the query of the game search.
     * @return the result of the search.
     */
    @GetMapping("/_search/games")
    public List<Game> searchGames(@RequestParam String query) {
        log.debug("REST request to search Games for query {}", query);
        return StreamSupport
            .stream(gameSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
