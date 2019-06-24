# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Load ads after consent has been given
- Update the documentation

### Removed
- Remove support for Improve tags

### Fixed
- Do not show domain name in title if locale is `de`.

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
