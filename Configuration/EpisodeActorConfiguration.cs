using flexflix.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Configuration
{
    public class EpisodeActorConfiguration : IEntityTypeConfiguration<EpisodeActor>
    {
        public void Configure(EntityTypeBuilder<EpisodeActor> builder)
        {
            builder.HasKey(i => new { i.ActorId, i.EpisodeId });

            builder.Property(i => i.Character)
                .IsRequired();

            builder.HasOne(i => i.Actor) 
                .WithMany(v => v.Episodes) 
                .HasForeignKey(v => v.ActorId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder.HasOne(i => i.Episode)
                .WithMany(v => v.Actors)
                .HasForeignKey(v => v.EpisodeId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        }
    }
}
