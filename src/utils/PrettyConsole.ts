export class PrettyConsole {
  closeByNewLine = true;
  useIcons = true;
  logsTitle = 'LOGS';
  warningsTitle = 'WARNINGS';
  errorsTitle = 'ERRORS';
  informationsTitle = 'INFORMATIONS';
  successesTitle = 'SUCCESS';
  debugsTitle = 'DEBUG';
  assertsTitle = 'ASSERT';
  private getColor(foregroundColor = '', backgroundColor = '') {
    let fgc = '\x1b[37m';
    switch (foregroundColor.trim().toLowerCase()) {
      case 'black':
        fgc = '\x1b[30m';
        break;
      case 'red':
        fgc = '\x1b[31m';
        break;
      case 'green':
        fgc = '\x1b[32m';
        break;
      case 'yellow':
        fgc = '\x1b[33m';
        break;
      case 'blue':
        fgc = '\x1b[34m';
        break;
      case 'magenta':
        fgc = '\x1b[35m';
        break;
      case 'cyan':
        fgc = '\x1b[36m';
        break;
      case 'white':
        fgc = '\x1b[37m';
        break;
    }

    let bgc = '';
    switch (backgroundColor.trim().toLowerCase()) {
      case 'black':
        bgc = '\x1b[40m';
        break;
      case 'red':
        bgc = '\x1b[44m';
        break;
      case 'green':
        bgc = '\x1b[44m';
        break;
      case 'yellow':
        bgc = '\x1b[43m';
        break;
      case 'blue':
        bgc = '\x1b[44m';
        break;
      case 'magenta':
        bgc = '\x1b[45m';
        break;
      case 'cyan':
        bgc = '\x1b[46m';
        break;
      case 'white':
        bgc = '\x1b[47m';
        break;
    }

    return `${fgc}${bgc}`;
  }
  private getColorReset() {
    return '\x1b[0m';
  }
  clear() {
    console.clear();
  }
  print(foregroundColor: string = 'white', backgroundColor: string = 'black', ...strings: (string | object)[]): void {
    const c: string = this.getColor(foregroundColor, backgroundColor);
    // turns objects into printable strings
    strings = strings.map((item: string | object) => {
      if (typeof item === 'object') item = JSON.stringify(item);
      return item;
    });
    console.log(c, strings.join(''), this.getColorReset());
    if (this.closeByNewLine) console.log('');
  }
  log(...strings: (string | object)[]): void {
    const fg: string = 'white';
    const bg: string = '';
    const icon: string = '\u25ce';
    const groupTile: string = ` ${this.logsTitle}`;
    if (strings.length > 1) {
      const c: string = this.getColor(fg, bg);
      console.group(c, (this.useIcons ? icon : '') + groupTile);
      const nl: boolean = this.closeByNewLine;
      this.closeByNewLine = false;
      strings.forEach((item: string | object) => {
        this.print(fg, bg, item, this.getColorReset());
      });
      this.closeByNewLine = nl;
      console.groupEnd();
      if (nl) console.log();
    } else {
      this.print(
        fg,
        bg,
        strings.map((item: string | object) => {
          return `${this.useIcons ? `${icon} ` : ''}${item}`;
        })
      );
    }
  }
  warn(...strings: (string | object)[]): void {
    const fg: string = 'yellow';
    const bg: string = '';
    const icon: string = '\u26a0';
    const groupTile: string = ` ${this.warningsTitle}`;
    if (strings.length > 1) {
      const c: string = this.getColor(fg, bg);
      console.group(c, (this.useIcons ? icon : '') + groupTile);
      const nl: boolean = this.closeByNewLine;
      this.closeByNewLine = false;
      strings.forEach((item: string | object) => {
        this.print(fg, bg, item, this.getColorReset());
      });
      this.closeByNewLine = nl;
      console.groupEnd();
      if (nl) console.log();
    } else {
      this.print(
        fg,
        bg,
        strings.map((item: string | object) => {
          return `${this.useIcons ? `${icon} ` : ''}${item}`;
        })
      );
    }
  }
  error(...strings: (string | object)[]): void {
    const fg: string = 'red';
    const bg: string = '';
    const icon: string = '\u26D4';
    const groupTile: string = ` ${this.errorsTitle}`;
    if (strings.length > 1) {
      const c: string = this.getColor(fg, bg);
      console.group(c, (this.useIcons ? icon : '') + groupTile);
      const nl: boolean = this.closeByNewLine;
      this.closeByNewLine = false;
      strings.forEach((item: string | object) => {
        this.print(fg, bg, item);
      });
      this.closeByNewLine = nl;
      console.groupEnd();
      if (nl) console.log();
    } else {
      this.print(
        fg,
        bg,
        strings.map((item: string | object) => {
          return `${this.useIcons ? `${icon} ` : ''}${item}`;
        })
      );
    }
  }
  info(...strings: (string | object)[]): void {
    const fg: string = 'blue';
    const bg: string = '';
    const icon: string = '\u2139';
    const groupTile: string = ` ${this.informationsTitle}`;
    if (strings.length > 1) {
      const c: string = this.getColor(fg, bg);
      console.group(c, (this.useIcons ? icon : '') + groupTile);
      const nl: boolean = this.closeByNewLine;
      this.closeByNewLine = false;
      strings.forEach((item: string | object) => {
        this.print(fg, bg, item);
      });
      this.closeByNewLine = nl;
      console.groupEnd();
      if (nl) console.log();
    } else {
      this.print(
        fg,
        bg,
        strings.map((item: string | object) => {
          return `${this.useIcons ? `${icon} ` : ''}${item}`;
        })
      );
    }
  }
  success(...strings: (string | object)[]): void {
    const fg: string = 'green';
    const bg: string = '';
    const icon: string = '\u2713';
    const groupTile: string = ` ${this.successesTitle}`;
    if (strings.length > 1) {
      const c: string = this.getColor(fg, bg);
      console.group(c, (this.useIcons ? icon : '') + groupTile);
      const nl: boolean = this.closeByNewLine;
      this.closeByNewLine = false;
      strings.forEach((item: string | object) => {
        this.print(fg, bg, item);
      });
      this.closeByNewLine = nl;
      console.groupEnd();
      if (nl) console.log();
    } else {
      this.print(
        fg,
        bg,
        strings.map((item: string | object) => {
          return `${this.useIcons ? `${icon} ` : ''}${item}`;
        })
      );
    }
  }
  debug(...strings: (string | object)[]): void {
    const fg: string = 'magenta';
    const bg: string = '';
    const icon: string = '\u1367';
    const groupTile: string = ` ${this.debugsTitle}`;
    if (strings.length > 1) {
      const c: string = this.getColor(fg, bg);
      console.group(c, (this.useIcons ? icon : '') + groupTile);
      const nl: boolean = this.closeByNewLine;
      this.closeByNewLine = false;
      strings.forEach((item: string | object) => {
        this.print(fg, bg, item);
      });
      this.closeByNewLine = nl;
      console.groupEnd();
      if (nl) console.log();
    } else {
      this.print(
        fg,
        bg,
        strings.map((item: string | object) => {
          return `${this.useIcons ? `${icon} ` : ''}${item}`;
        })
      );
    }
  }
  assert(...strings: (string | object)[]): void {
    const fg: string = 'cyan';
    const bg: string = '';
    const icon: string = '\u0021';
    const groupTile: string = ` ${this.assertsTitle}`;
    if (strings.length > 1) {
      const c: string = this.getColor(fg, bg);
      console.group(c, (this.useIcons ? icon : '') + groupTile);
      const nl: boolean = this.closeByNewLine;
      this.closeByNewLine = false;
      strings.forEach((item: string | object) => {
        this.print(fg, bg, item);
      });
      this.closeByNewLine = nl;
      console.groupEnd();
      if (nl) console.log();
    } else {
      this.print(
        fg,
        bg,
        strings.map((item: string | object) => {
          return `${this.useIcons ? `${icon} ` : ''}${item}`;
        })
      );
    }
  }
}
