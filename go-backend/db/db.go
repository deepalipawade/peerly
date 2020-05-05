package db

import (
	"context"
)

type Storer interface {
	ListUsers(context.Context) ([]User, error)
	ListOrganizations(context.Context) ([]Organization, error)
	GetOrganization(context.Context, int) (Organization, error)
	CreateOrganization(context.Context, Organization) (Organization, error)
	DeleteOrganization(context.Context, int) error
	UpdateOrganization(context.Context, Organization, int) (Organization, error)
<<<<<<< HEAD
	GetUser(context.Context, int) (User, error)
	UpdateUser(context.Context, User, int) (User, error)

=======
	CreateRecognitionHi5(context.Context, RecognitionHi5)(error)
>>>>>>> Add recognition Hi5 API
	//Create(context.Context, User) error
	//GetUser(context.Context) (User, error)
	//Delete(context.Context, string) error
}
