package tasks

import (
	"joshsoftware/peerly/service"
	"time"

	"github.com/go-co-op/gocron"
)

// Init - called in main.go this method "bootstraps" the goroutine for
// cleaning up blacklisted tokens (handled in the db package) and can
// be used for other such tasks. This is run in place of cron or
// external scripts that would otherwise do the same thing.
func Init(deps service.Dependencies) {
	s1 := gocron.NewScheduler(time.UTC)
	//To reset Hi5 quota balance user's of each organization
	s1.Every(1).Day().At("00:00").Do(deps.Store.ResetHi5QuotaBalanceJob)
	s1.Every(1).Hours().Do(deps.Store.CleanBlacklistedTokens)
	s1.Start()
}
