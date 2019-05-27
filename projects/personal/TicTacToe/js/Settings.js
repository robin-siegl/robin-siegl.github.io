// Settings class
class Settings {
	// constructor
	constructor (colorActive, colorInactive, colorDark, colorLight, colorPlayer1, colorPlayer2) {
		this.colorActive = colorActive;
		this.colorInactive = colorInactive;
		this.colorDark = colorDark;
		this.colorLight = colorLight;
		this.colorPlayer1 = colorDark;
		this.colorPlayer2 = colorLight;
	}
}

// initialize settings
const gameSettings = new Settings;
gameSettings.colorActive = "#4caf50";
gameSettings.colorInactive = "#ebebeb";
gameSettings.colorDark = "#212121";
gameSettings.colorLight = "#fafafa";
gameSettings.colorPlayer1 = "#b71c1c";
gameSettings.colorPlayer2 = "#01579b";