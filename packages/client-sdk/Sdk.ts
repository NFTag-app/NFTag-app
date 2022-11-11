import {
	GameType,
	MessageType,
	PlayerType,
	SnapType,
	TeamType,
	UserType,
} from "./types";

export class User implements UserType {
	name: string;
	image: string;
	uid: string;
	games: Game[];
	constructor(name?: string, image?: string, uid?: string) {
		this.name = name || "User";
		this.image = image || "";
		this.uid = uid || "";
		this.games = [];
	}
}

export class Player extends User implements PlayerType {
	active: boolean;
	kills: number;
	team: Team;
	constructor(name: string, image: string, uid: string, team: Team) {
		super(name, image, uid);

		this.active = true;
		this.kills = 0;
		this.team = team;
	}
}

export class Game implements GameType {
	name: string;
	id: string;
	owner: User;
	teams: Team[];
	constructor(name: string, id: string, owner: User) {
		this.name = name;
		this.id = id;
		this.owner = owner;
		this.teams = [];
	}
}

export class Team implements TeamType {
	name: string;
	code: string;
	players: Player[];
	constructor(name: string, code: string) {
		this.name = name;
		this.code = code;
		this.players = [];
	}
}

export class Message implements MessageType {
	sender: User;
	message: string;
	constructor(sender: User, message: string) {
		this.sender = sender;
		this.message = message;
	}
}

export class Snap implements SnapType {
	image: string;
	player: Player;
	target: Player;
	approved: boolean;
	constructor(image: string, player: Player, target: Player) {
		this.image = image;
		this.player = player;
		this.target = target;
		this.approved = false;
	}
}
