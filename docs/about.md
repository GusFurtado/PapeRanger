# About

## License

PapeRanger is released under the
[MIT License](https://github.com/GusFurtado/PapeRanger/blob/main/LICENSE).

## Credits

Icons from [Lucide](https://lucide.dev) (ISC), the crop box by
[Cropper.js](https://github.com/fengyuanchen/cropperjs) (MIT), image processing by
[Pillow](https://python-pillow.org) (MIT-CMU), PDFs by
[pypdf](https://github.com/py-pdf/pypdf) (BSD), and the wordmark in
[Montserrat](https://github.com/JulietaUla/Montserrat) (SIL OFL), outlined.
Their licenses are in [`frontend/vendor/`](https://github.com/GusFurtado/PapeRanger/tree/main/frontend/vendor).

## Contributing

```sh
python3 -m venv .venv
.venv/bin/pip install -r requirements-dev.txt
.venv/bin/pytest
DATA_DIR=./data .venv/bin/uvicorn app.main:create_app --factory --reload
```

The frontend is plain HTML, CSS and JS in `frontend/`, served as is. The API is
documented at `/api/docs` while the app runs. `app/storage.py` explains the volume
layout and the encryption switch in detail.

The main use is a phone camera, so check UI changes at phone width (390 px) too.

## History

The name is *papelada* (Portuguese for "paperwork", or more precisely "a pile of papers")
plus a ranger to keep it in order. Up to v0.4 it was called Papelada; see
[upgrading from Papelada](installation.md#upgrading-from-papelada).
