using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class DeleteActivity
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid ActivityID { get; set; }
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Activity activity = await _dataContext.Activities.FindAsync(request.ActivityID);
                
                if(activity == null) return null;

                _dataContext.Remove(activity);
                
                bool result = await _dataContext.SaveChangesAsync() > 0;
                
                if(!result) return Result<Unit>.Failure("Failed to delete activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}