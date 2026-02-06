/*
  # Ajouter un champ d'adresse aux tables de formulaires

  1. Changements
    - Ajouter un champ d'adresse à la table form_submissions
    - Ajouter un champ d'adresse à la table quotes
    - Mettre à jour les contraintes et les politiques existantes
    
  2. Sécurité
    - Maintenir les politiques RLS existantes
    - Assurer la compatibilité avec les données existantes
*/

-- Ajouter le champ d'adresse à form_submissions s'il n'existe pas déjà
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'form_submissions' 
    AND column_name = 'address'
  ) THEN
    ALTER TABLE form_submissions ADD COLUMN address text;
  END IF;
END $$;

-- Ajouter une fonction pour formater l'adresse complète
CREATE OR REPLACE FUNCTION format_address(
  street_number text,
  street_name text,
  postal_code text
) RETURNS text AS $$
DECLARE
  city text;
  formatted_address text;
BEGIN
  -- Déterminer la ville en fonction du code postal
  CASE
    WHEN postal_code = '68740' THEN city := 'Fessenheim';
    WHEN postal_code LIKE '67%' THEN city := 'Strasbourg';
    WHEN postal_code LIKE '68%' THEN city := 'Colmar';
    WHEN postal_code LIKE '90%' THEN city := 'Belfort';
    WHEN postal_code LIKE '57%' THEN city := 'Sarrebourg';
    ELSE city := 'Ville inconnue';
  END CASE;
  
  -- Formater l'adresse complète
  formatted_address := street_number || ' ' || street_name || ', ' || postal_code || ' ' || city;
  
  RETURN formatted_address;
END;
$$ LANGUAGE plpgsql;

-- Créer une fonction pour extraire le code postal d'une adresse complète
CREATE OR REPLACE FUNCTION extract_postal_code(address text) RETURNS text AS $$
DECLARE
  postal_code text;
BEGIN
  -- Tenter d'extraire un code postal à 5 chiffres
  postal_code := substring(address FROM '[0-9]{5}');
  
  -- Si aucun code postal n'est trouvé, renvoyer une chaîne vide
  IF postal_code IS NULL THEN
    RETURN '';
  END IF;
  
  RETURN postal_code;
END;
$$ LANGUAGE plpgsql;

-- Créer un trigger pour mettre à jour le champ postal_code à partir de l'adresse
CREATE OR REPLACE FUNCTION update_postal_code_from_address()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.address IS NOT NULL AND (NEW.postal_code IS NULL OR NEW.postal_code = '') THEN
    NEW.postal_code := extract_postal_code(NEW.address);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Ajouter le trigger à form_submissions si ce n'est pas déjà fait
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_postal_code_trigger'
  ) THEN
    CREATE TRIGGER update_postal_code_trigger
      BEFORE INSERT OR UPDATE ON form_submissions
      FOR EACH ROW
      EXECUTE FUNCTION update_postal_code_from_address();
  END IF;
END $$;

-- Ajouter le trigger à quotes si ce n'est pas déjà fait
DO $$ 
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'quotes'
  ) AND NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_postal_code_quotes_trigger'
  ) THEN
    CREATE TRIGGER update_postal_code_quotes_trigger
      BEFORE INSERT OR UPDATE ON quotes
      FOR EACH ROW
      EXECUTE FUNCTION update_postal_code_from_address();
  END IF;
END $$;

-- Créer une fonction pour générer une adresse complète
CREATE OR REPLACE FUNCTION generate_full_address(
  street_number text,
  street_name text,
  postal_code text
) RETURNS text AS $$
DECLARE
  city text;
BEGIN
  -- Déterminer la ville en fonction du code postal
  CASE
    WHEN postal_code = '68740' THEN city := 'Fessenheim';
    WHEN postal_code LIKE '67%' THEN city := 'Strasbourg';
    WHEN postal_code LIKE '68%' THEN city := 'Colmar';
    WHEN postal_code LIKE '90%' THEN city := 'Belfort';
    WHEN postal_code LIKE '57%' THEN city := 'Sarrebourg';
    ELSE city := 'Ville inconnue';
  END CASE;
  
  RETURN street_number || ' ' || street_name || ', ' || postal_code || ' ' || city;
END;
$$ LANGUAGE plpgsql;