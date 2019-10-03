# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Use `choice.js` again instead of `choice-static.js`.
  Quantcast has created a long term fix for the problem where the popup is being shown when consent has already been given.

## [2.0.3] - 2019-09-26
## [2.0.3-beta.2] - 2019-09-26
### Fixed
- Polyfill `Object.assign`, to account for [Internet Explorer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Browser_compatibility).

## [2.0.3-beta.1] - 2019-09-26
### Changed
- Use `choice-static.js` in quantcast template.
  Quantcast has created this file to contain a short term fix for the problem where the popup is being shown when consent has already been given.

## [2.0.2] - 2019-09-19
## [2.0.2-beta.2] - 2019-09-19
### Changed
- Account for multiple euconsent cookies.

## [2.0.2-beta.1] - 2019-09-18
### Added
- The stub will remove the euconsent cookie if the cmpId is set to 1.

## ~~[2.0.1-beta.1] - 2019-09-13~~
### ~~Added~~
- ~~Add cmp.stub2.bundle.js that does not contain the QuantCast CMP.~~

## [2.0.0] - 2019-09-13
## [2.0.0-beta.3] - 2019-09-13
### Fixed
- Keep waiting until the CMP is loaded

## [2.0.0-beta.2] - 2019-09-11
### Changed
- Prepend QuantCast script to stub without uglification

## [2.0.0-beta.1] - 2019-09-06
### Added
- Add script `cmp.dfp.bundle.js` to render AppNexus tags with DFP.

### Changed
- Replace our own CMP with the QuantCast CMP
- Read the configuration from `config/config.js`.
  Use `config/config.dist.js` to create `config/config.js`.

### Removed
- Remove support for the custom CMP implementation (`cmp.custom.bundle.js`)
- Remove `ndmtag.bundle.js` (not to be confused with `cmp.ndmtag.bundle.js`)
- Remove `cmp.ssp.bundle.js`

## [1.3.1] - 2019-08-06
### Changed
- Style for buttons
- Replace right arrow with html special char code

## [1.3.0] - 2019-08-02
### Added
- Add styling for `span` and `p`
- Add back button to start

### Removed
- Remove border-radius

## [1.3.0-beta.3] - 2019-08-01
### Fixed
- Fixed styling issues

## [1.3.0-beta.2] - 2019-07-30
### Changed
- Changed translations
- Restyled scrolling bar and added padding to pop-up

## [1.3.0-beta.1] - 2019-07-25
### Added
- Allow user to specify which vendors are given consent.
- Perform request to check if GDPR applies and if not, automatically give consent.

### Changed
- Load ads after consent has been given
- Update the documentation
- Move texts from components to translation file `src/lib/translations.js`.
- Update Dutch translations.

### Removed
- Remove support for Improve tags
- Remove unused dependencies.
- Remove support for German, Spanish and French translations.
- Translations can no longer be overwritten from config.

### Security
- Upgrade dependencies with security vulnerabilities.

## [1.2.0] - 2019-06-13
### Added
- Add support for French sites

### Changed
- Update documentation

### Fixed
- Use `display: none;` to close an ad and hide tags when inserting a fallback ad

## [1.1.2-RC1] - 2019-03-04
### Added
- CMP stub will update the config if `window.ndmCmpConfig` is set

### Changed
- Use overflow hidden when closing an ad

## [1.1.1] - 2019-02-12
### Fixed
- Separate postscribe import

## [1.1.0] - 2019-02-11

## [1.1.0-RC1] - 2019-01-31
### Added
- Fallback ad functionality

## [1.0.0] - 2019-01-30

[Unreleased]: https://github.com/nextdaymedia/cmp/tree/master
[1.0.0]: https://github.com/nextdaymedia/cmp/tree/1.0.0
[1.1.0-RC1]: https://github.com/nextdaymedia/cmp/tree/1.1.0-RC1
[1.1.0]: https://github.com/nextdaymedia/cmp/tree/1.1.0
[1.1.1]: https://github.com/nextdaymedia/cmp/tree/1.1.1
[1.1.2-RC1]: https://github.com/nextdaymedia/cmp/tree/1.1.2-RC1
[1.2.0]: https://github.com/nextdaymedia/cmp/tree/1.2.0
[1.3.0-beta.1]: https://github.com/nextdaymedia/cmp/tree/1.3.0-beta.1
[1.3.0-beta.2]: https://github.com/nextdaymedia/cmp/tree/1.3.0-beta.2
[1.3.0-beta.3]: https://github.com/nextdaymedia/cmp/tree/1.3.0-beta.3
[1.3.0]: https://github.com/nextdaymedia/cmp/tree/1.3.0
[1.3.1]: https://github.com/nextdaymedia/cmp/tree/1.3.1
[2.0.0-beta.1]: https://github.com/nextdaymedia/cmp/tree/2.0.0-beta.1
[2.0.0-beta.2]: https://github.com/nextdaymedia/cmp/tree/2.0.0-beta.2
[2.0.0-beta.3]: https://github.com/nextdaymedia/cmp/tree/2.0.0-beta.3
[2.0.0]: https://github.com/nextdaymedia/cmp/tree/2.0.0
[2.0.1-beta.1]: https://github.com/nextdaymedia/cmp/tree/2.0.1-beta.1
[2.0.2-beta.1]: https://github.com/nextdaymedia/cmp/tree/2.0.2-beta.1
[2.0.2-beta.2]: https://github.com/nextdaymedia/cmp/tree/2.0.2-beta.2
[2.0.2]: https://github.com/nextdaymedia/cmp/tree/2.0.2
[2.0.3-beta.1]: https://github.com/nextdaymedia/cmp/tree/2.0.3-beta.1
[2.0.3-beta.2]: https://github.com/nextdaymedia/cmp/tree/2.0.3-beta.2
[2.0.3]: https://github.com/nextdaymedia/cmp/tree/2.0.3
