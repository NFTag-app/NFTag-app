export interface UserType {
	name: string;
	image: string;
	uid: string;
	games: GameType[];
}

export interface PlayerType extends UserType {
	active: boolean;
	kills: number;
	team: TeamType;
}

export interface GameType {
	name: string;
	id: string;
	owner: UserType;
	teams: TeamType[];
}

export interface TeamType {
	name: string;
	code: string;
	players: PlayerType[];
}

export interface MessageType {
	sender: UserType;
	message: string;
}

export interface SnapType {
	image: string; //base64
	player: PlayerType;
	target: PlayerType;
	approved: boolean;
}

export interface Sdk {
	setUser: any;
	feed: MessageType[];

	submissions: SnapType[]; // unapproved snaps

	user: UserType | null;
	player: PlayerType | null;
	team: TeamType | null;
	game: GameType | null;

	// authentication
	signIn(): Promise<UserType | null>;
	signOut(): Promise<void>;

	// games
	createGame(name: string): Promise<GameType | null>;
	joinGame(id: string): Promise<GameType | null>;

	// teams
	createTeam(name: string, game?: GameType): Promise<TeamType | null>;
	joinTeam(code: string, game?: GameType): Promise<TeamType | null>;

	// snaps
	uploadSnap(image: string): Promise<SnapType | null>;
	getSnap(id: string): Promise<SnapType | null>;
	submitSnap(snap: SnapType, game?: GameType): Promise<SnapType | null>;
	approveSnap(
		snap: SnapType,
		game: GameType,
		approve?: boolean
	): Promise<SnapType | null>;

	// messages
	sendMessage(message: string): Promise<MessageType | null>;
}
