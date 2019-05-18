-- Find the nearest resturant to a point
SELECT o1.organization_name, ST_AsText(o1.geog)
FROM laststraw.organizations AS o1
ORDER BY 'POINT(-95.3921964 29.7464826)'::geography <-> geog;
