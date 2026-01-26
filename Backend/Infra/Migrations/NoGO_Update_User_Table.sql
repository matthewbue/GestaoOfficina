-- Script SQL SEM GO - Para ferramentas web ou clientes que não suportam GO
-- Banco de dados: db_ac4527_oficina2026
-- Execute este script se estiver usando site4now.net ou similar

-- IMPORTANTE: Execute cada bloco separadamente se der erro

-- ========================================
-- BLOCO 1: Adicionar coluna Profile
-- ========================================
IF COL_LENGTH('User', 'Profile') IS NULL
BEGIN
    ALTER TABLE [User] ADD [Profile] INT NOT NULL DEFAULT 1;
    PRINT 'Coluna Profile adicionada';
END
ELSE
BEGIN
    PRINT 'Coluna Profile já existe';
END;

-- ========================================
-- BLOCO 2: Adicionar coluna ProfilePhoto
-- ========================================
IF COL_LENGTH('User', 'ProfilePhoto') IS NULL
BEGIN
    ALTER TABLE [User] ADD [ProfilePhoto] VARBINARY(MAX) NULL;
    PRINT 'Coluna ProfilePhoto adicionada';
END
ELSE
BEGIN
    PRINT 'Coluna ProfilePhoto já existe';
END;

-- ========================================
-- BLOCO 3: Atualizar registros sem Profile
-- ========================================
UPDATE [User] 
SET [Profile] = 1 
WHERE [Profile] = 0 OR [Profile] IS NULL;

-- ========================================
-- BLOCO 4: Criar tabela Empresa (se não existir)
-- ========================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Empresa')
BEGIN
    CREATE TABLE [Empresa] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [Nome] NVARCHAR(MAX) NULL,
        [Endereco] NVARCHAR(MAX) NULL,
        [Email] NVARCHAR(MAX) NULL
    );
    PRINT 'Tabela Empresa criada';
END
ELSE
BEGIN
    PRINT 'Tabela Empresa já existe';
END;

-- ========================================
-- BLOCO 5: Verificar estrutura final
-- ========================================
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'User'
ORDER BY ORDINAL_POSITION;
