CREATE TEMP TABLE importorgs (
	name         text,
	address      text,
	lat          double precision,
	long         double precision,
	styrofoam    bool,
	plastic      bool,
	icondiments  bool,
	compostable  bool,
	junk         text
);

\COPY importorgs FROM './data/data.csv' WITH ( FORMAT csv, HEADER true );

INSERT INTO laststraw.organizations (
	organization_name,
	has_plastic_straw,
	has_single_serve_condiments,
	packaging,
	geog
)
SELECT
	name,
	CASE WHEN random() > 0.5 THEN true ELSE false END,
	CASE WHEN random() > 0.5 THEN true ELSE false END,
	CASE
		WHEN random() < 0.33 THEN 'all_compostable'::laststraw.packaging
		WHEN random() < 0.5 THEN 'plastic'::laststraw.packaging
		ELSE 'stryofoam'::laststraw.packaging
	END,
	ST_MakePoint(long, lat)::geography
FROM importorgs;
