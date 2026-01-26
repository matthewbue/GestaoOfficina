-- Script SQL para atualizar tabela User
-- Execute este script manualmente no SQL Server Management Studio ou Azure Data Studio
-- Banco de dados: db_ac4527_oficina2026

USE [db_ac4527_oficina2026]; -- ? BANCO DE DADOS CORRETO
GO

PRINT '=== Iniciando atualização da tabela User ===';
GO

-- 1. Verificar se a tabela Users existe
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
BEGIN
    PRINT 'Tabela Users encontrada. Iniciando alterações...';
    
    -- 2. Renomear tabela Users para User
    EXEC sp_rename 'Users', 'User';
    PRINT 'Tabela renomeada para User';
    
    -- 3. Remover coluna Profission se existir
    IF COL_LENGTH('User', 'Profission') IS NOT NULL
    BEGIN
        ALTER TABLE [User] DROP COLUMN Profission;
        PRINT 'Coluna Profission removida';
    END
    
    -- 4. Alterar colunas para NOT NULL com tamanhos definidos
    IF COL_LENGTH('User', 'Name') IS NOT NULL
    BEGIN
        -- Atualizar valores NULL antes de alterar
        UPDATE [User] SET [Name] = 'Usuario Sem Nome' WHERE [Name] IS NULL;
        ALTER TABLE [User] ALTER COLUMN [Name] NVARCHAR(200) NOT NULL;
        PRINT 'Coluna Name alterada para NVARCHAR(200) NOT NULL';
    END
    
    IF COL_LENGTH('User', 'Email') IS NOT NULL
    BEGIN
        UPDATE [User] SET [Email] = 'sem.email@exemplo.com' WHERE [Email] IS NULL;
        ALTER TABLE [User] ALTER COLUMN [Email] NVARCHAR(200) NOT NULL;
        PRINT 'Coluna Email alterada para NVARCHAR(200) NOT NULL';
    END
    
    IF COL_LENGTH('User', 'Password') IS NOT NULL
    BEGIN
        UPDATE [User] SET [Password] = 'ferreira123' WHERE [Password] IS NULL;
        ALTER TABLE [User] ALTER COLUMN [Password] NVARCHAR(200) NOT NULL;
        PRINT 'Coluna Password alterada para NVARCHAR(200) NOT NULL';
    END
    
    IF COL_LENGTH('User', 'CPF') IS NOT NULL
    BEGIN
        UPDATE [User] SET [CPF] = '00000000000' WHERE [CPF] IS NULL;
        ALTER TABLE [User] ALTER COLUMN [CPF] NVARCHAR(14) NOT NULL;
        PRINT 'Coluna CPF alterada para NVARCHAR(14) NOT NULL';
    END
    
    -- 5. Adicionar coluna Profile se não existir
    IF COL_LENGTH('User', 'Profile') IS NULL
    BEGIN
        ALTER TABLE [User] ADD [Profile] INT NOT NULL DEFAULT 1;
        PRINT 'Coluna Profile adicionada (default: 1 - Admin)';
    END
    
    -- 6. Adicionar coluna ProfilePhoto se não existir
    IF COL_LENGTH('User', 'ProfilePhoto') IS NULL
    BEGIN
        ALTER TABLE [User] ADD [ProfilePhoto] VARBINARY(MAX) NULL;
        PRINT 'Coluna ProfilePhoto adicionada';
    END
    
    PRINT 'Alterações na tabela User concluídas com sucesso!';
END
ELSE
BEGIN
    PRINT 'Tabela Users não encontrada. Verificando se User já existe...';
    
    IF EXISTS (SELECT * FROM sys.tables WHERE name = 'User')
    BEGIN
        PRINT 'Tabela User já existe. Verificando colunas necessárias...';
        
        -- Adicionar coluna Profile se não existir
        IF COL_LENGTH('User', 'Profile') IS NULL
        BEGIN
            ALTER TABLE [User] ADD [Profile] INT NOT NULL DEFAULT 1;
            PRINT 'Coluna Profile adicionada (default: 1 - Admin)';
        END
        
        -- Adicionar coluna ProfilePhoto se não existir
        IF COL_LENGTH('User', 'ProfilePhoto') IS NULL
        BEGIN
            ALTER TABLE [User] ADD [ProfilePhoto] VARBINARY(MAX) NULL;
            PRINT 'Coluna ProfilePhoto adicionada';
        END
        
        PRINT 'Colunas verificadas/adicionadas com sucesso!';
    END
    ELSE
    BEGIN
        PRINT 'ERRO: Nenhuma tabela de usuários encontrada!';
        PRINT 'Listando todas as tabelas disponíveis:';
        SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE';
    END
END
GO

-- 7. Criar tabela Empresa se não existir
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
END
GO

-- 8. Atualizar dados existentes (se necessário)
-- Definir Profile padrão para registros antigos
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'User')
BEGIN
    UPDATE [User] 
    SET [Profile] = 1 
    WHERE [Profile] = 0 OR [Profile] IS NULL;
    
    DECLARE @UpdatedRows INT = @@ROWCOUNT;
    IF @UpdatedRows > 0
        PRINT CONCAT('Atualizados ', @UpdatedRows, ' registros com Profile padrão (Admin)');
    ELSE
        PRINT 'Nenhum registro precisou ser atualizado';
END
GO

-- 9. Verificar alterações
PRINT '=== Estrutura final da tabela User ===';
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'User'
ORDER BY ORDINAL_POSITION;

PRINT '';
PRINT '=== Contagem de registros ===';
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'User')
BEGIN
    DECLARE @TotalUsers INT;
    SELECT @TotalUsers = COUNT(*) FROM [User];
    PRINT CONCAT('Total de usuários: ', @TotalUsers);
END

PRINT '';
PRINT '=== Script concluído com sucesso! ===';
GO
