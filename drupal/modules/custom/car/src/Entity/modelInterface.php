<?php

namespace Drupal\car\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface for defining Model entities.
 *
 * @ingroup car
 */
interface modelInterface extends ContentEntityInterface, EntityChangedInterface, EntityOwnerInterface {

  // Add get/set methods for your configuration properties here.

  /**
   * Gets the Model name.
   *
   * @return string
   *   Name of the Model.
   */
  public function getName();

  /**
   * Sets the Model name.
   *
   * @param string $name
   *   The Model name.
   *
   * @return \Drupal\car\Entity\modelInterface
   *   The called Model entity.
   */
  public function setName($name);

  /**
   * Gets the Model creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Model.
   */
  public function getCreatedTime();

  /**
   * Sets the Model creation timestamp.
   *
   * @param int $timestamp
   *   The Model creation timestamp.
   *
   * @return \Drupal\car\Entity\modelInterface
   *   The called Model entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Returns the Model published status indicator.
   *
   * Unpublished Model are only visible to restricted users.
   *
   * @return bool
   *   TRUE if the Model is published.
   */
  public function isPublished();

  /**
   * Sets the published status of a Model.
   *
   * @param bool $published
   *   TRUE to set this Model to published, FALSE to set it to unpublished.
   *
   * @return \Drupal\car\Entity\modelInterface
   *   The called Model entity.
   */
  public function setPublished($published);

}
