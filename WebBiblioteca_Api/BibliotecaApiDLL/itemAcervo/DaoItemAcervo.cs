﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace BibliotecaApiDLL.itemAcervo
{
    public class DaoItemAcervo
    {
		private string TableName => "MvtBIBItemAcervo";
		private string InsertCommand => $@"INSERT INTO {TableName} (
											titulo, 
											descricao, 
											numeroExemplar, 
											codAutor, 
											codEditora, 
											codColecao, 
											Tipo, 
											codSecao, 
											volume, 
											anoEdicao, 
											idioma, 
											status
											) VALUES ( 
											@titulo, 
											@descricao, 
											@numeroExemplar, 
											@codAutor, 
											@codEditora, 
											@codColecao, 
											@Tipo, 
											@codSecao, 
											@volume, 
											@anoEdicao, 
											@idioma, 
											@status
											)";
		private string UpdateCommand => $@"UPDATE {TableName} SET 
											titulo = @titulo, 
											descricao = @descricao, 
											numeroExemplar = @numeroExemplar, 
											codAutor = @codAutor, 
											codEditora = @codEditora, 
											codColecao = @codColecao, 
											codTipo = @codTipo, 
											codSecao = @codSecao, 
											volume = @volume, 
											anoEdicao = @anoEdicao, 
											idioma = @idioma, 
											status = @status
											 WHERE codLivro = @codLivro";
		
											  
		public void Salvar(ItemAcervo itemAcervo)
		{
			using (var cmd = new SqlCommand())
			{
				string autor = itemAcervo.Autor.Split(new string[] { " - código " }, StringSplitOptions.None)[1];
				string editora = itemAcervo.Editora.Split(new string[] { " - código " }, StringSplitOptions.None)[1];
				string colecao = itemAcervo.ColeCao.Split(new string[] { " - código " }, StringSplitOptions.None)[1];
				string secao = itemAcervo.SeCao.Split(new string[] { " - código " }, StringSplitOptions.None)[1];

                if (itemAcervo.CodLivro != 0)
                {
					cmd.CommandText = UpdateCommand;
					cmd.Parameters.AddWithValue("@codLivro", itemAcervo.CodLivro);
				}
                else
                {
					cmd.CommandText = InsertCommand;
				}

				

				cmd.Parameters.AddWithValue("@titulo", itemAcervo.TiTulo);
				cmd.Parameters.AddWithValue("@descricao", itemAcervo.Descricao);
				cmd.Parameters.AddWithValue("@numeroExemplar", itemAcervo.NumeroExemplar);
				cmd.Parameters.AddWithValue("@codAutor", autor);
				cmd.Parameters.AddWithValue("@codEditora", editora);
				cmd.Parameters.AddWithValue("@codColecao", colecao);
				cmd.Parameters.AddWithValue("@Tipo", itemAcervo.Tipo);
				cmd.Parameters.AddWithValue("@codSecao", secao);
				cmd.Parameters.AddWithValue("@volume", itemAcervo.Volume);
				cmd.Parameters.AddWithValue("@anoEdicao", itemAcervo.AnoEdicAo);
				cmd.Parameters.AddWithValue("@idioma", itemAcervo.IdIoma);
				cmd.Parameters.AddWithValue("@status", itemAcervo.StatuS);

				using (var Con = new Conexao())
				{
					cmd.Connection = Con.Conectar();
					cmd.ExecuteNonQuery();
				}
			}
		}
		public List<ItemAcervo> GetDados(int id)
		{
			var List = new List<ItemAcervo>();
			using (var cmd = new SqlCommand())
			{
				if (id != 0)
                {
					cmd.CommandText = $@"SELECT Livro.codLivro
								,Livro.titulo,Livro.descricao,Livro.numeroExemplar,Autor.nomeAutor,Editora.nomeEditora,Colecao.nomeColecao,Livro.Tipo
								,Secao.descricaoSecao, Livro.volume, Livro.anoEdicao, Livro.idioma, Livro.status
							FROM MvtBIBItemAcervo As Livro 
							INNER JOIN MvtBIBAutor as Autor on Livro.codAutor = Autor.codAutor 
							INNER JOIN MvtBIBEditora as Editora on Livro.codEditora = Editora.codEditora 
							INNER JOIN MvtBIBColecao as Colecao on Livro.codColecao = Colecao.codAutor 
							INNER JOIN MvtBIBSecao as Secao on Livro.codSecao = Secao.codSecao
							WHERE codLivro LIKE '%{id}%'";
				}
                else
                {
					cmd.CommandText = $@"SELECT Livro.codLivro
								,Livro.titulo,Livro.descricao,Livro.numeroExemplar,Autor.nomeAutor,Editora.nomeEditora,Colecao.nomeColecao,Livro.Tipo
								,Secao.descricaoSecao, Livro.volume, Livro.anoEdicao, Livro.idioma, Livro.status
							FROM MvtBIBItemAcervo As Livro 
							INNER JOIN MvtBIBAutor as Autor on Livro.codAutor = Autor.codAutor 
							INNER JOIN MvtBIBEditora as Editora on Livro.codEditora = Editora.codEditora 
							INNER JOIN MvtBIBColecao as Colecao on Livro.codColecao = Colecao.codAutor 
							INNER JOIN MvtBIBSecao as Secao on Livro.codSecao = Secao.codSecao
							WHERE codLivro LIKE '%{""}%'";
                }
				using (var Con = new Conexao())
				{
					cmd.Connection = Con.Conectar();
					var reader = cmd.ExecuteReader();
					while (reader.Read())
					{
						List.Add(ReaderToObject(reader));
					}
				}
			}
			return List;
		}
		public ItemAcervo ReaderToObject(SqlDataReader reader)
		{
			return new ItemAcervo(
				Convert.ToInt32(reader["codLivro"]),
				Convert.ToString(reader["titulo"]),
				Convert.ToString(reader["descricao"]),
				Convert.ToString(reader["numeroExemplar"]),
				Convert.ToString(reader["nomeAutor"]),
				Convert.ToString(reader["nomeEditora"]),
				Convert.ToString(reader["nomeColecao"]),
				Convert.ToString(reader["Tipo"]),
				Convert.ToString(reader["descricaoSecao"]),
				Convert.ToInt32(reader["volume"]),
				Convert.ToInt32(reader["anoEdicao"]),
				Convert.ToString(reader["idioma"]),
				Convert.ToString(reader["status"])
				);
		}
	}
}
