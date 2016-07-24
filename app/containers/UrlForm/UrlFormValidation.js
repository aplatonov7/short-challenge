import {createValidator, required, match, url} from '../../utils/validation'

const UrlFormValidation = createValidator({
  url: [
    required(),
    url()
  ],
  shortcode: [match(/^[0-9a-zA-Z_]{4,}$/, 'Not a valid shortcode')]
});

export default UrlFormValidation