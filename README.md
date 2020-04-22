![ACF Tools - Advanced Custom Fields code made simple](https://user-images.githubusercontent.com/25268506/79060144-bd7e0700-7c81-11ea-958f-4de9aff2bc01.jpg)

This is a Google Chrome extension/Firefox add-on for Advanced Custom Fields to help with speeding up development. 🔥

[![License](http://img.shields.io/:license-mit-semigreen.svg)](https://opensource.org/licenses/MIT)
[![Latest release](https://img.shields.io/github/v/release/RostiMelk/ACF-Tools?label=Github%20release)](https://github.com/RostiMelk/ACF-Tools/releases/latest)
[![Google Web Store version](https://img.shields.io/chrome-web-store/v/ogliegjmpalokmaaeckcdgbhdeedcnmf)](https://chrome.google.com/webstore/detail/acf-tools/ogliegjmpalokmaaeckcdgbhdeedcnmf)
[![Mozilla Firefox add-on libary version](https://img.shields.io/amo/v/ACF-Tools?color=orange)](https://addons.mozilla.org/en-US/firefox/addon/acf-tools/)

## Table of content

- [What does it do?](#but-what-does-it-do)
- [Installation](#installation)
  - [Chrome Web Store](#chrome-web-store)
  - [Firefox browser add-ons](#firefox-browser-add-ons)
- [Contributing](#contributing)
  - [Translation](#translation)
  - [Field code output](#field-code-output)
  - [Contributors](#contributors)
- [Development setup](#development-setup)
  - [Google Chrome](#google-chrome)
  - [Mozilla Firefox](#mozilla-firefox)
- [Contact Details](#contact-details)
- [License](#license)

---

### But what does it do?

![Copy ACF meta field code with just one click](https://user-images.githubusercontent.com/25268506/79060055-14cfa780-7c81-11ea-8893-8f951471d4ac.jpg)
![Look up field names when edition posts and pages](https://user-images.githubusercontent.com/25268506/79060056-18fbc500-7c81-11ea-9b5a-b816fc116f14.jpg)
![open documentation for a field type with just a click](https://user-images.githubusercontent.com/25268506/79060057-19945b80-7c81-11ea-92c2-2fe46f8750cf.jpg)

---

## Installation

### Chrome web store

You can [find the extension on the Chrome web store](https://chrome.google.com/webstore/detail/acf-tools/ogliegjmpalokmaaeckcdgbhdeedcnmf), but keep in mind that the version may be 2-4 days older than the one on Github.

### Firefox browser add-ons

You can [find the extension in the Firefox add-on libary](https://addons.mozilla.org/en-US/firefox/addon/acf-tools/).

---

## Contributing

### Translation

I need your help with translations

1. Fork this repository.
2. Edit `messages.json` in `src/_locales/[localeCode]`. If it does not already exist, create a directory according to the [supported locales](https://developer.chrome.com/webstore/i18n?csw=1#localeTable).
3. Increase the last version number in `src/manifest.json` on line 4
4. Create a new pull request.

### Field code output

I am always looking for suggestions on how to make the field code output better. If you have a suggestion, [submit an issue](https://github.com/RostiMelk/ACF-Tools/issues/new).

### Contributors
<a href="https://github.com/rostimelk/acf-tools/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=rostimelk/acf-tools" alt="Image list of contributors" />
</a>

---

## Development setup

### Google Chrome

1. Clone repo
2. Go to `chrome://extensions/`
3. Drag and drop the `src` folder into this window
4. Write code
5. Refresh Chrome Extension to test and debug as you develop

### Mozilla Firefox

1. Clone repo
2. cd into `ACF-Tools` folder
3. Build Project with `$ sh build.sh`
4. Go to `about:debugging`
5. Click "This Firefox"
6. Click "Load Temporary Add-on"
7. Navigate into ACF-Tools/dist
8. Select `acf-tools-vX.X.X-firefox.zip` to test

---

## Contact details

Rostislav Melkumyan - @RostiMelk - hello@rosti.no \
Project Link: https://github.com/RostiMelk/ACF-Tools \
Feeling generous? Donations are accepted on paypal: hello@rosti.no

---

## License

Distributed under the MIT license. See `LICENSE` for more information.
