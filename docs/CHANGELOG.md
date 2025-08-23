# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.0] 2025-08-21

### 💡 Added
- Custom render hook for tables.
- New shortcodes for figure images, disclosure widget element, the kbd element, and video embedding for (twitch, youtube, & vimeo).
- Configurable `Print` & `Copy Link` buttons for the post share icons.
- Configurable max socialshare icons count in the `data/socialshare.yml` file.
- Mixin for `@media print`
- Examples:
  - ```yaml
      max_icon_count: 4
      buttons:
          show_copy_button: true
          show_print_button: true
      ```
---

### ✨ Changed
- The number of icons displayed on the post share section.
- Main container padding size on smaller screens.

#### 🪲 Fixed
- Default table styles
- Elements to display when printing post to pdf `@media print`.



## [v0.1.0] 2025-08-16
### INITIAL RELEASE [v0.1.0 2025-08-16](https://github.com/logstacklabs/plumeo/releases/tag/v0.1.0)
- #### 💡 Added
- #### 🪲 Fixed
- #### ✨ Changed
- #### 🔥 Removed


[0.2.0]: https://github.com/logstacklabs/plumeo/releases/tag/v0.2.0
[0.1.0]: https://github.com/logstacklabs/plumeo/releases/tag/v0.1.0
