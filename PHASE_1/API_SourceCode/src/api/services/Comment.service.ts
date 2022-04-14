import { getLogger } from "../../utils/Logger";
import {
  ICommentPostRequestBody,
  ICommentPostSuccessResponse,
} from "IApiResponses";
import { CommentRepository } from "../../repositories/Comment.repository";
import { CountryRepository } from "../../repositories/Country.repository";
import { UserRepository } from "../../repositories/User.respository";
import { CommentEntity } from "../../entity/Comment.entity";
import { CountryEntity } from "../../entity/Country.entity";
import { UserEntity } from "../../entity/User.entity";
import { HTTPError } from "../../utils/Errors";
import { badRequest, internalServerError } from "../../utils/Constants";
import { convertCommentEntityToInterface } from "../../converters/Comment.converter";
import { getLog } from "../../utils/Helpers";

export class CommentService {
  private logger = getLogger();
  constructor(
    readonly commentRepository: CommentRepository,
    readonly countryRepository: CountryRepository,
    readonly userRepository: UserRepository
  ) {}

  async createComment(
    commentDetails: ICommentPostRequestBody
  ): Promise<ICommentPostSuccessResponse | undefined> {
    const user = await this.getUser(commentDetails.userId);
    const country = await this.getCountry(commentDetails.countryId);
    this.logger.info("arrived here");
    const newComment = new CommentEntity();
    newComment.createdBy = user;
    newComment.country = country;
    newComment.message = commentDetails.message;
    newComment.date = new Date();

    const commentEntity: CommentEntity =
      await this.commentRepository.saveComment(newComment);
    if (commentEntity === undefined) {
      this.logger.error(
        `Failed to post comment by ${commentDetails.userId} and in country ${commentDetails.countryId}`
      );
      throw new HTTPError(internalServerError);
    }

    this.logger.info(
      `Successfully posted new comment, with commentId: ${commentEntity.commentId}`
    );

    return {
      comment: convertCommentEntityToInterface(commentEntity),
      log: getLog(new Date()),
    };
  }

  async getUser(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.getUser(userId);

    if (user === undefined) {
      this.logger.error(`Failed to find user with userId ${userId}`);
      throw new HTTPError(badRequest);
    }

    return user;
  }

  async getCountry(countryId: string): Promise<CountryEntity> {
    const country = await this.countryRepository.getCountry(countryId);

    if (country === undefined) {
      this.logger.error(`Failed to find country with countryId ${countryId}`);
      throw new HTTPError(badRequest);
    }

    return country;
  }
}
