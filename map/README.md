# Map – Local Tile Server

Serve OpenStreetMap vector tiles locally using **TileServer GL** and an India/western-zone extract.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed and running
- At least **8 GB RAM** recommended
- The `.osm.pbf` source file (see below)

## Step 0: Download the Source Data

Download the western-zone extract from Geofabrik:

```
https://download.geofabrik.de/asia/india/western-zone.html
```

Place the downloaded file in the project root before proceeding.

## Folder Structure

```
map/
├── data/
│   ├── western-zone-latest.osm.pbf
│   └── western-zone.mbtiles        ← generated in Step 1
```

Set up the `data/` folder:

```bash
mkdir data
mv western-zone-latest.osm.pbf data/
```

## Step 1: Convert `.pbf` → `.mbtiles`

TileServer GL works best with `.mbtiles`. Use [tilemaker](https://github.com/systemed/tilemaker) to convert:

```bash
docker run -it --rm \
  -v $(pwd)/data:/data \
  ghcr.io/systemed/tilemaker:master \
  /data/western-zone-latest.osm.pbf \
  --output /data/western-zone.mbtiles
```

> CPU usage will spike — this is normal. Conversion takes a few minutes.

Verify the output file was created:

```bash
ls
# western-zone.mbtiles  ← must be present
```

## Step 2: Move `.mbtiles` into `data/`

```bash
mv western-zone.mbtiles data/
```

Final structure should look like:

```
map/
└── data/
    ├── western-zone-latest.osm.pbf
    └── western-zone.mbtiles        ✓
```

## Step 3: Run TileServer GL

```bash
docker run -it \
  -v $(pwd)/data:/data \
  -p 8080:80 \
  klokantech/tileserver-gl
```

TileServer GL will auto-detect `western-zone.mbtiles` in `/data`. The startup logs should show:

```
Using western-zone.mbtiles
```

If you see `Zurich` in the logs, the `.mbtiles` file was not found — recheck Step 2.

## Step 4: Open in Browser

Open [http://localhost:8080](http://localhost:8080).

You should see your India / western-region map.

Available endpoints:

| Endpoint | Description |
|---|---|
| `http://localhost:8080` | Map preview UI |
| `/styles/basic/{z}/{x}/{y}.png` | Raster tile endpoint |

## Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| Server loads Zurich demo map | `.mbtiles` not found in `/data` | Confirm `western-zone.mbtiles` is inside `data/` before running Step 3 |
| Conversion crashes or hangs | Less than 8 GB RAM | Close other apps; a machine with more RAM is recommended |
| Blank map / no tiles | File not found inside container | Ensure the `.mbtiles` file is inside `data/` and TileServer GL logs show the correct filename |
