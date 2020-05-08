// Package naked contains rules and game logic for the Naked Salad Bowl game.
package naked

import (
	"errors"
	"fmt"
	"math/rand"
)

const (
	// The number of words per WordCard.
	WordCount = 3
	
	// The number of cards per Player.
	CardCount = 3
)

// The naked salad bowl game state.
type NakedSaladBowlGameState struct {
	bowl  *NakedSaladBowl
	teams map[string]*Team
	round Round
}

const (
	Taboo Round = iota
	Pictionary
	Word
)

// Round determines the current round of the game, which can be one of
// Taboo for describing the words, Pictionary for drawing the words,
// or Word for giving a single word clue.
type Round = uint8

// NewNakedSaladBowlGameState initializes an empty starting game state for
// naked salad bowl.
func NewNakedSaladBowlGameState() *NakedSaladBowlGameState {
	return &NakedSaladBowlGameState{
		bowl:  NewNakedSaladBowl(),
		teams: map[string]*Team{},
		round: Taboo,
	}
}

// JoinTeam enables the specified player to join the specified team.
func (n *NakedSaladBowlGameState) JoinTeam(teamName string, p Player) {
	if team, ok := n.teams[teamName]; ok {
		team.AddPlayer(p)
	} else {
		team = NewTeam(teamName)
		n.teams[teamName] = team
		team.AddPlayer(p)
	}
}

// StartGame begins the naked salad bowl game. It finalizes all teams and
// randomly selects a team and player on that team to start.
func (n *NakedSaladBowlGameState) StartGame() {
	startingTeam := rand.Intn(len(n.teams))

	i := 0
	for _, team := range n.teams {
		team.Finalize()
		
		j := 0
		for _, player := range team.players {
			leadingPlayer := rand.Intn(len(team.players))
			if i == startingTeam && j == leadingPlayer {
				player.state = Leading
			} else if i == startingTeam {
				player.state = Playing
			} else {
				player.state = Watching
			}
			j++
		}
		i++
	}
}

// SubmitWordCard submits WordCard on behalf of Player.
func (n *NakedSaladBowlGameState) SubmitWordCard(p Player, w WordCard) error {
	return n.bowl.submitCard(p, w)
}

// finishRound completes the current round of naked salad bowl and
func (n *NakedSaladBowlGameState) finishRound() {
	n.round++

	if n.round == Word {
		n.finishGame()
	}
}

// finishGame completes the game and marks a winner.
func (n *NakedSaladBowlGameState) finishGame() {
	// TODO
}

// A pot of words for playing naked salad bowl.
type NakedSaladBowl struct {
	pending         map[WordCard]bool
	done            map[WordCard]bool
	submissionCount map[string]uint8
}

// NewNakedSaladBowl creates a new naked salad bowl. Words are uninitialized
// initially and should be passed in as they are submitted.
func NewNakedSaladBowl() *NakedSaladBowl {
	return &NakedSaladBowl{
		pending:         map[WordCard]bool{},
		done:            map[WordCard]bool{},
		submissionCount: map[string]uint8{},
	}
}

// Reset resets the bowl, moving all completed words back to the done pile.
func (b *NakedSaladBowl) resetDone() {
	for card := range b.done {
		b.pending[card] = true
		b.done[card] = false
	}
}

// submitCard submits a card on behalf of a player.
func (b *NakedSaladBowl) submitCard(p Player, w WordCard) error {
	if count, ok := b.submissionCount[p.key]; ok && count < CardCount {
		b.submissionCount[p.key]++
	} else if ok {
		b.submissionCount[p.key] = 1
	} else {
		return errors.New(fmt.Sprintf("You've already submitted %d word cards!", CardCount))
	}
	return nil
}

// A word card represents a single card of words.
type WordCard = [WordCount]string

// A team consists of its constituent players and their current score.
type Team struct {
	name      string
	players   map[string]Player
	finalized bool
	score     uint32
}

// NewTeam creates a new team of players.
func NewTeam(name string) *Team {
	return &Team{
		name:      name,
		finalized: false,
		score:     0,
	}
}

// AddPlayer adds a new player to the current team.
func (t *Team) AddPlayer(player Player) {
	if !t.finalized {
		t.players[player.key] = player
	}
}

// Flags this team as finalized. It no longer can be modified, and are locked in
// for the game to begin.
func (t *Team) Finalize() {
	t.finalized = true
}

// A player is a single Naked Salad BowlGame participant.
type Player struct {
	username string

	// A unique user ID generated for this player for their game session. Required
	// to act on behalf of this player (add words for, make guess as, etc.)
	key   string
	state PlayerState
}

// NewPlayer creates a new game participant with the specified username.
func NewPlayer(username, key string) *Player {
	return &Player{
		username: username,
		key:      key,
		state:    Queued,
	}
}

const (
	Queued PlayerState = iota
	Watching
	Leading
	Playing
)

// A player can be in one of the four distinct states. If a player is waiting for
// a game to begin, they are Queued. If their team is currently
// guessing words, they are Playing. If not, they are Watching. If they are on
// the Playing team and offering directives, they are Leading.
type PlayerState = uint8
